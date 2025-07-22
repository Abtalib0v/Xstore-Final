import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Products",
        url: "/admin/shop",
        icon: Home,
    },
    {
        title: "Blogs",
        url: "/admin/blog-shop",
        icon: Home,
    },
    {
        title: "Products Sizes",
        url: "/admin/product-sizes",
        icon: Inbox,
    },
    {
        title: "Product Categories",
        url: "/admin/product-categories",
        icon: Calendar,
    },
    {
        title: "Blog Categories",
        url: "/admin/blog-categories",
        icon: Calendar,
    },
    {
        title: "Product Colors",
        url: "/admin/product-colors",
        icon: Search,
    },
    {
        title: " Orders",
        url: "/admin/orders",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}