import { ref, computed } from "vue";
import axios from "axios";
import type { Resource, Department, Assignment, Conflict } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8080/api/resources",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export function useResourceData() {
  const selectedView = ref("calendar");
  const showAddResourceModal = ref(false);
  const newResource = ref({
    name: "",
    department: "",
    skills: "",
  });

  const resources = ref<Resource[]>([]);
  const departments = ref<Department[]>([]);
  const assignments = ref<Assignment[]>([]);
  const conflicts = ref<Conflict[]>([]);

  const fetchData = async () => {
    try {
      // First, let's check what we're getting from each endpoint
      const resourcesRes = await api.get("/resources");
      
      const departmentsRes = await api.get("/departments");
      
      const assignmentsRes = await api.get("/assignments");;
      
      const conflictsRes = await api.get("/conflicts");

      // Now set the data
      resources.value = resourcesRes.data;
      departments.value = departmentsRes.data;
      assignments.value = assignmentsRes.data || [];
      conflicts.value = conflictsRes.data;
    } catch (error) {
      console.error("Failed to fetch resource data:", error);
    }
  };

  const initializeData = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error("Failed to initialize resource data:", error);
    }
  };

  return {
    api,
    selectedView,
    showAddResourceModal,
    newResource,
    resources,
    departments,
    assignments,
    conflicts,
    fetchData,
    initializeData,
  };
}