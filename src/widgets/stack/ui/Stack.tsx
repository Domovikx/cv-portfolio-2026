import { useTranslation } from 'react-i18next'

import { skillGroups } from '@/entities/skill'
import { SECTION_IDS } from '@/shared/config'
import { useCvTranslation } from '@/shared/lib'
import { Card, Chip, Container, Section, SectionTitle } from '@/shared/ui'

import styles from './Stack.module.css'

export const Stack = () => {
  const { t } = useTranslation()
  const tc = useCvTranslation()

  return (
    <Section id={SECTION_IDS.stack}>
      <Container>
        <SectionTitle title={t('stack.title')} subtitle={t('stack.subtitle')} />
        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <Card key={group.nameKey} variant="gray">
              <h3 className={styles.groupTitle}>{tc(group.nameKey)}</h3>
              <div className={styles.chips}>
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
