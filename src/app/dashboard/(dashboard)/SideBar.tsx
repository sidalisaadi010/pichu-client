"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Inbox,
  CreditCard,
  HelpCircle,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    children: [
      { icon: Inbox, label: "All Orders", href: "/orders" },
      { icon: CreditCard, label: "Payments", href: "/payments" },
      { icon: Package, label: "Shipments", href: "/shipments" },
    ],
  },
  {
    icon: Package,
    label: "Products",
    children: [
      { icon: Package, label: "All Products", href: "/products" },
      { icon: Package, label: "Categories", href: "/categories" },
      { icon: Package, label: "Inventory", href: "/inventory" },
    ],
  },
  {
    icon: Users,
    label: "Customers",
    href: "/customers",
  },
  {
    icon: Settings,
    label: "Settings",
    children: [
      { icon: Settings, label: "General", href: "/settings/general" },
      { icon: Users, label: "Team", href: "/settings/team" },
      { icon: CreditCard, label: "Billing", href: "/settings/billing" },
    ],
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
  },
];

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "w-full justify-between",
          depth > 0 && "pl-8",
          hasChildren && "font-semibold"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <Button variant="ghost" className="w-full justify-start">
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
          {hasChildren &&
            (isOpen ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            ))}
        </Button>
      </SidebarMenuButton>
      {hasChildren && isOpen && (
        <SidebarMenu>
          {item.children?.map((child, index) => (
            <MenuItemComponent key={index} item={child} depth={depth + 1} />
          ))}
        </SidebarMenu>
      )}
    </SidebarMenuItem>
  );
};
export default function DynamicSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold">E-commerce Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <MenuItemComponent key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
