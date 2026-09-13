import { About } from '@/widgets/about'
import { Contacts } from '@/widgets/contacts'
import { Education } from '@/widgets/education'
import { Experience } from '@/widgets/experience'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Projects } from '@/widgets/projects'
import { Stack } from '@/widgets/stack'

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Education />
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
