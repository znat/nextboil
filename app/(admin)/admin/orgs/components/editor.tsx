import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { gql, useMutation } from '@apollo/client';
import { Organization } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { GET_ALL_ORGANIZATIONS } from '../page';

const CREATE_ORGANIZATION = gql`
    mutation createOrganization($name: String!) {
        createOrganization(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_ORGANIZATION = gql`
    mutation updateOrganization($id: String!, $name: String!) {
        updateOrganization(id: $id, name: $name) {
            id
            name
        }
    }
`;

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
});

interface Props {
    item?: Organization;
    children: React.ReactNode;
}

export function OrganizationEditor({ children, item }: Props) {
    const { toast } = useToast();
    const [open, setOpen] = useState<boolean | undefined>(undefined);
    const [
        createOrganization,
        { data: createResult, loading: creating, error: errorCreating },
    ] = useMutation(CREATE_ORGANIZATION, {
        refetchQueries: [{ query: GET_ALL_ORGANIZATIONS }],
    });
    const [
        updateOrganization,
        { data: updateResult, loading: updating, error: errorUpdating },
    ] = useMutation(UPDATE_ORGANIZATION);

    const mutation = item ? updateOrganization : createOrganization;
    const data = createResult || updateResult;
    const loading = creating || updating;
    const error = errorCreating || errorUpdating;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item?.name,
        },
    });

    const title = item ? 'Edit organization' : 'Create an organization';
    const description = item
        ? "Make changes to the organization here. Click save when you're done."
        : "Create a new organization here. Click save when you're done.";
    const successMessage = item
        ? 'Organization succesfully updated'
        : 'Organization succesfully created';

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await mutation({
            variables: item ? { id: item.id, ...values } : values,
        });
        if (result.data) {
            toast({
                description: successMessage,
            });
            setOpen(false);
        }
        if (error) {
            toast({
                variant: 'destructive',
                description: `Something went wrong: ${error.message}`,
            });
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='my-5'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of the organization.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SheetFooter>
                            <Button disabled={loading} type='submit'>
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
