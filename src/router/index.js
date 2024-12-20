import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import FileViewer from "../components/FileViewer.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/file/:id",
    name: "file-viewer",
    component: FileViewer,
    props: route => ({ fileId: route.params.id })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
