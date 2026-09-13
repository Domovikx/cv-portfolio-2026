import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { projects } from '@/entities/project'
import { GithubRepos } from '@/features/github-repos'
import { cn, useCvTranslation } from '@/shared/lib'
import { Button, Card, Chip, Container, Section, SectionTitle } from '@/shared/ui'

import styles from './Projects.module.css'

const STATUS_CLASS: Record<string, string> = {
  'projects.statusInProgress': styles.inProgress,
  'projects.statusLegacy': styles.legacy,
}

export const Projects = () => {
  const { t } = useTranslation()
  const tc = useCvTranslation()
  const [reposOpen, setReposOpen] = useState(false)

  return (
    <Section id="projects">
      <Container>
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />
        <div className={styles.grid}>
          {projects.map((project) => (
            <Card key={project.titleKey} className={styles.card}>
              <h3 className={styles.cardTitle}>{tc(project.titleKey)}</h3>
              <div className={styles.meta}>
                <span className={styles.year}>{project.year}</span>
                <span className={cn(styles.status, STATUS_CLASS[project.statusKey])}>
                  {tc(project.statusKey)}
                </span>
              </div>
              <p className={styles.cardText}>{tc(project.textKey)}</p>
              <div className={styles.spacer} />
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <Chip key={tag} className={styles.smallChip}>
                    {tag}
                  </Chip>
                ))}
              </div>
              <div className={styles.links}>
                <a className={styles.link} href={project.repoUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                {project.demoUrl ? (
                  <a
                    className={styles.link}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
        <div className={styles.liveBlock}>
          <Button variant="ghost" onClick={() => setReposOpen(true)}>
            {t('githubRepos.cta')}
          </Button>
        </div>
      </Container>
      <GithubRepos open={reposOpen} onClose={() => setReposOpen(false)} />
    </Section>
  )
}
