import { FolderOpenIcon, HistoryIcon, KeyIcon } from "lucide-react";

export const MenuItems = [
{
    title: "Main",
    items: [
        {
           title: "Workflows",
           icon: FolderOpenIcon,
           url: "/workflows"
        },
        {
           title: "Credentials",
           icon: KeyIcon,
           url: "/credentials"
        },
        {
           title: "Executions",
           icon: HistoryIcon,
           url: "/executions"
        },
    ]
}
]
