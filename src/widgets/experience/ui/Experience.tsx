import { useTranslation } from 'react-i18next'

import { experienceItems } from '@/entities/experience'
import { useCvTranslation } from '@/shared/lib'
import { Card, Chip, Container, Section, SectionTitle } from '@/shared/ui'

import styles from './Experience.module.css'

export const Experience = () => {
  const { t } = useTranslation()
  const tc = useCvTranslation()

  return (
    <Section id="experience" variant="gray">
      <Container>
        <SectionTitle title={t('experience.title')} subtitle={t('experience.subtitle')} />
        <div className={styles.timeline}>
          {experienceItems.map((item) => (
            <div key={item.roleKey} className={styles.item}>
              <Card>
                <p className={styles.period}>
                  {item.period}
                  {item.periodKey ? ` — ${tc(item.periodKey)}` : ''}
                </p>
                <h3 className={styles.role}>{tc(item.roleKey)}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.text}>{tc(item.textKey)}</p>
                <div className={styles.tags}>
                  {item.tags.map((tag) => (
                    <Chip key={tag} className={styles.smallChip}>
                      {tag}
                    </Chip>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
