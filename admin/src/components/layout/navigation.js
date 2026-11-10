import {
  Award,
  Briefcase,
  FileStack,
  Images,
  Inbox,
  LayoutDashboard,
  MonitorPlay,
  ScrollText,
  Users,
} from "lucide-react";

// Sidebar groups and command-palette entries. `state` is passed with navigation
// (used to open the Bulk Generator directly on the Letters page).
export const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Activity, totals and shortcuts" },
    ],
  },
  {
    label: "Certificates",
    items: [
      { path: "/certificates", label: "Letters", icon: Award, description: "Create offer letters and completion certificates" },
      { path: "/certificate-logs", label: "Certificate logs", icon: ScrollText, description: "Every letter that has been issued" },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { path: "/job-listings", label: "Job Listings", icon: Briefcase, description: "Create and edit open positions" },
      { path: "/job-applications", label: "Applications", icon: Inbox, description: "Review applicants and issue letters" },
      { path: "/candidate-excel", label: "Candidates", icon: Users, description: "Import and export candidate sheets" },
    ],
  },
  {
    label: "Website",
    items: [
      { path: "/hero-banner", label: "Hero Banner", icon: MonitorPlay, description: "Homepage slides and videos" },
      { path: "/gallery", label: "Gallery", icon: Images, description: "Albums and photos" },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items.map((item) => ({ ...item, group: group.label })));

// The Bulk Generator has a single visible button (in the top navbar); it is also reachable from Ctrl+K.
export const BULK_ACTION = {
  path: "/certificates",
  label: "Bulk Generator",
  icon: FileStack,
  description: "Generate certificates for many students at once",
  state: { openBulk: true },
  key: "bulk",
};

export function pageFor(pathname) {
  const path = pathname === "/" ? "/dashboard" : pathname;
  return NAV_ITEMS.find((item) => item.path === path && !item.state) || null;
}
