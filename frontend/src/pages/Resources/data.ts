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
      console.log('Resources response:', resourcesRes.data);
      
      const departmentsRes = await api.get("/departments");
      console.log('Departments response:', departmentsRes.data);
      
      const assignmentsRes = await api.get("/assignments");
      console.log('Assignments response:', assignmentsRes.data);
      
      const conflictsRes = await api.get("/conflicts");
      console.log('Conflicts response:', conflictsRes.data);

      // Now set the data
      resources.value = resourcesRes.data;
      departments.value = departmentsRes.data;
      assignments.value = assignmentsRes.data || [];
      conflicts.value = conflictsRes.data;

      console.log('After setting data:', {
        resources: resources.value,
        departments: departments.value,
        assignments: assignments.value,
        conflicts: conflicts.value
      });

    } catch (error) {
      console.error("Failed to fetch resource data:", error);
      console.log('Error details:', {
        message: error.message,
        response: error.response?.data
      });
    }
  };

  const initializeData = async () => {
    try {
      console.log('Starting initialization');
      const initResponse = await api.post('/init');
      console.log('Initialization response:', initResponse.data);
      
      await fetchData();
    } catch (error) {
      console.error("Failed to initialize resource data:", error);
      console.log('Init error details:', {
        message: error.message,
        response: error.response?.data
      });
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