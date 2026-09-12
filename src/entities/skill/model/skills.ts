import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    nameKey: 'stack.groups.frameworks',
    items: ['React', 'Angular', 'Vue', 'React Router'],
  },
  {
    nameKey: 'stack.groups.languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SCSS', 'CSS Modules'],
  },
  {
    nameKey: 'stack.groups.integrations',
    items: ['REST API', 'HTTP', 'OpenAPI/Swagger', 'Firebase'],
  },
  {
    nameKey: 'stack.groups.tools',
    items: ['Vite', 'Git', 'GitHub Pages', 'Figma', 'Vitest', 'oxlint', 'Prettier'],
  },
  {
    nameKey: 'stack.groups.ai',
    items: ['opencode', 'LLM (Qwen)', 'Voice cloning (TTS)'],
  },
]
