import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
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
import { Edit, Pencil } from 'lucide-react';

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
    item: Organization;
}

export function OrganizationEditor({ item }: Props) {
    const { toast } = useToast();
    const [open, setOpen] = useState<boolean | undefined>(undefined);
    const [updateOrganization, { data, loading, error }] =
        useMutation(UPDATE_ORGANIZATION);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item.name,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await updateOrganization({
            variables: { id: item.id, name: values.name },
        });

        toast({
            description: 'Organization succesfully updated',
        });
        setOpen(false);
    };

    return (
        <Sheet open={open}>
            <Button variant='ghost' onClick={() => setOpen(true)}>
                <Pencil size={18} />
            </Button>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit organization</SheetTitle>
                    <SheetDescription>
                        Make changes to the organization here. Click save when
                        you&apos;re done.
                    </SheetDescription>
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
