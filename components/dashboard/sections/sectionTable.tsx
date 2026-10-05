import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import react from "react";

interface SectionsTableProps{
    sections: Section[];
    isLoading: boolean;
    onPreview: (section: Section) => void;
    onCreateSection: () => void;
}

const SectionsTable = ({sections, isLoading, onPreview, onCreateSection}: SectionsTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Name
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Sources
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Tone
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Scope
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Status
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500 text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center">

                        </TableCell>
                    </TableRow>
                ) : <>
                </>}

            </TableBody>
        </Table>
    );
}

export default SectionsTable;