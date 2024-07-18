import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser, IconPlug
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconUser,
    href: "/admin/users",
  },
  {
    id: uniqueId(),
    title: "Discussion",
    icon: IconTable,
    href: "/admin/discussions",
  },
  {
    id: uniqueId(),
    title: "Resource",
    icon: IconLayoutGrid,
    href: "/admin/resources",
  },
  {
    id: uniqueId(),
    title: "Event",
    icon: IconPhoto,
    href: "/admin/events",
  },
  {
    id: uniqueId(),
    title: "Survey",
    icon: IconStar,
    href: "/admin/surveys",
  },
];

export default Menuitems;
