// src/utils/scoutFilters.ts
export const filterTalents = (talents: any[], filters: any) => {
    return talents.filter((talent) => {
      if (filters.category && talent.category !== filters.category) return false;
      if (filters.position && talent.position !== filters.position) return false;
      if (filters.skills && filters.skills.length) {
        return filters.skills.every((skill: string) => talent.skills.includes(skill));
      }
      return true;
    });
  };
  