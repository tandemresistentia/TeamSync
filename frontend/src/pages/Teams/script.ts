import { computed } from 'vue'
import { search, departmentFilter, teamMembers, TeamMember } from './data'

// Computed Properties
export const filteredMembers = computed(() => {
  return teamMembers.value.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(search.value.toLowerCase()) ||
                         member.role.toLowerCase().includes(search.value.toLowerCase())
    const matchesDepartment = departmentFilter.value === 'all' || 
                             member.department === departmentFilter.value
    return matchesSearch && matchesDepartment
  })
})

// Methods
export const getAvailabilityClass = (status: string) => {
  const classes = {
    'Available': 'px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full',
    'On Leave': 'px-2 py-1 text-sm text-red-800 bg-red-100 rounded-full',
    'In Meeting': 'px-2 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full'
  }
  return classes[status] || ''
}

export const openAddMemberModal = () => {
  console.log('Opening add member modal...')
}

export const openScheduleModal = () => {
  console.log('Opening schedule modal...')
}

export const openMemberDetails = (member: TeamMember) => {
  console.log('Opening member details:', member)
}
