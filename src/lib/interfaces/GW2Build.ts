export interface CharacterBuild {
    profession: string;
    specializations: Specialization[];
    skills: any;
    aquatic_skills: any;
}

export interface Specialization {
    id: number
    name: string
    profession: string
    elite: boolean
    minor_traits: MinorTrait[]
    major_traits: MajorTrait[]
    icon: string
    background: string
    weapon_trait?: MinorTrait;
    profession_icon_big?: string
    profession_icon?: string
  }
  
  export interface MinorTrait {
    id: number
    name: string
    description: string
    icon: string
  }
  
  export interface MajorTrait {
    id: number
    name: string
    description: string
    icon: string
    active: boolean
  }

  export interface CharacterSkills {
    heal: Skill
    utilities: Skill[]
    elite: Skill
  }

  export interface Skill {
    id: number
    name: string
    description: string
    icon: string
  }