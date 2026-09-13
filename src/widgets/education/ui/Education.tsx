import { useTranslation } from 'react-i18next'

import { Card, Container, Section, SectionTitle } from '@/shared/ui'

import styles from './Education.module.css'

type EducationItem = {
  period: string
  degree: string
  place: string
}

export const Education = () => {
  const { t } = useTranslation()
  const items = t('education.items', { returnObjects: true }) as unknown as EducationItem[]

  return (
    <Section id="education" variant="gray">
      <Container>
        <SectionTitle title={t('education.title')} subtitle={t('education.subtitle')} />
        <div className={styles.grid}>
          {items.map((item) => (
            <Card key={`${item.period}-${item.degree}`}>
              <p className={styles.period}>{item.period}</p>
              <h3 className={styles.degree}>{item.degree}</h3>
              <p className={styles.place}>{item.place}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
