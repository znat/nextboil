import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
    title: string;
    message: string;
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<Props> = ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    children,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        onCancel?.();
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {message}
                    <DialogFooter>
                        <Button variant='secondary' onClick={handleCancel}>
                            {cancelText}
                        </Button>
                        <Button onClick={handleConfirm}>{confirmText}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ConfirmModal;
