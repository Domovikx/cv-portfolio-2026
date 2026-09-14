import { useTranslation } from 'react-i18next'

import { SECTION_IDS } from '@/shared/config'
import { Card, Container, Section, SectionTitle } from '@/shared/ui'

import styles from './About.module.css'

type AboutCard = {
  title: string
  text: string
}

export const About = () => {
  const { t } = useTranslation()
  const cards = t('about.cards', { returnObjects: true }) as unknown as AboutCard[]

  return (
    <Section id={SECTION_IDS.about} variant="gray">
      <Container>
        <SectionTitle title={t('about.title')} subtitle={t('about.text')} />
        <div className={styles.grid}>
          {cards.map((card) => (
            <Card key={card.title}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
