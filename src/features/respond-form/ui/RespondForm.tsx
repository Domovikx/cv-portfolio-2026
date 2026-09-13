import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useSendRespondMutation } from '@/shared/api'
import type { RespondPayload } from '@/shared/api'
import type { TranslationKey } from '@/shared/config'
import { profile } from '@/entities/profile'
import { cn, useCvTranslation } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'

import styles from './RespondForm.module.css'

type RespondFormProps = {
  open: boolean
  onClose: () => void
}

type FieldErrors = Partial<Record<keyof RespondPayload | 'consent', TranslationKey>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/

const validate = (form: RespondPayload, consent: boolean): FieldErrors => {
  const errors: FieldErrors = {}

  if (!form.name.trim()) errors.name = 'respondForm.required'
  if (!form.surname.trim()) errors.surname = 'respondForm.required'
  if (!form.email.trim()) errors.email = 'respondForm.required'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'respondForm.emailInvalid'
  if (form.resumeLink && !URL_RE.test(form.resumeLink))
    errors.resumeLink = 'respondForm.linkInvalid'
  if (!consent) errors.consent = 'respondForm.consentRequired'

  return errors
}

export const RespondForm = ({ open, onClose }: RespondFormProps) => {
  const { t } = useTranslation()
  const tc = useCvTranslation()
  const [sendRespond, { isLoading, isSuccess, isError, reset }] = useSendRespondMutation()
  const [form, setForm] = useState<RespondPayload>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    resumeLink: '',
  })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const setField = (field: keyof RespondPayload) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(form, consent)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    await sendRespond(form)
  }

  const handleClose = () => {
    reset()
    setForm({ name: '', surname: '', email: '', phone: '', resumeLink: '' })
    setConsent(false)
    setErrors({})
    onClose()
  }

  return (
    <Modal open={open} title={t('respondForm.title')} onClose={handleClose}>
      {isSuccess ? (
        <div className={styles.success}>
          <span className={styles.successIcon} aria-hidden="true">
            ✓
          </span>
          <p>{t('respondForm.success', { email: profile.email })}</p>
          <Button variant="ghost" onClick={handleClose}>
            {t('respondForm.close')}
          </Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="respond-form">
          <div className={styles.field}>
            <label className={styles.label} htmlFor="respond-name">
              {t('respondForm.name')}
            </label>
            <input
              id="respond-name"
              data-testid="respond-name"
              className={cn(styles.input, errors.name && styles.inputError)}
              value={form.name}
              onChange={setField('name')}
            />
            {errors.name ? <p className={styles.error}>{tc(errors.name)}</p> : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="respond-surname">
              {t('respondForm.surname')}
            </label>
            <input
              id="respond-surname"
              className={cn(styles.input, errors.surname && styles.inputError)}
              value={form.surname}
              onChange={setField('surname')}
              data-testid="respond-surname"
            />
            {errors.surname ? <p className={styles.error}>{tc(errors.surname)}</p> : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="respond-email">
              {t('respondForm.email')}
            </label>
            <input
              id="respond-email"
              data-testid="respond-email"
              type="email"
              className={cn(styles.input, errors.email && styles.inputError)}
              value={form.email}
              onChange={setField('email')}
            />
            {errors.email ? <p className={styles.error}>{tc(errors.email)}</p> : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="respond-phone">
              {t('respondForm.phone')}
            </label>
            <input
              id="respond-phone"
              data-testid="respond-phone"
              type="tel"
              className={styles.input}
              value={form.phone}
              onChange={setField('phone')}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="respond-link">
              {t('respondForm.resumeLink')}
            </label>
            <input
              id="respond-link"
              data-testid="respond-link"
              className={cn(styles.input, errors.resumeLink && styles.inputError)}
              value={form.resumeLink}
              onChange={setField('resumeLink')}
              placeholder="https://..."
            />
            {errors.resumeLink ? <p className={styles.error}>{tc(errors.resumeLink)}</p> : null}
          </div>
          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>{t('respondForm.consent')}</span>
          </label>
          {errors.consent ? <p className={styles.error}>{tc(errors.consent)}</p> : null}
          {isError ? <p className={styles.error}>{t('respondForm.error')}</p> : null}
          <Button
            type="submit"
            size="l"
            className={styles.submit}
            data-testid="respond-submit"
            disabled={isLoading}
          >
            {isLoading ? t('respondForm.sending') : t('respondForm.submit')}
          </Button>
          <p className={styles.hint}>{t('respondForm.hint')}</p>
        </form>
      )}
    </Modal>
  )
}
