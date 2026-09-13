import { useTranslation } from 'react-i18next'

import { useGetReposQuery } from '@/shared/api'
import { formatRelativeTime } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'

import styles from './GithubRepos.module.css'

type GithubReposProps = {
  open: boolean
  onClose: () => void
}

export const GithubRepos = ({ open, onClose }: GithubReposProps) => {
  const { t, i18n } = useTranslation()
  const {
    data: repos,
    isLoading,
    isError,
    refetch,
  } = useGetReposQuery(undefined, {
    skip: !open,
  })

  return (
    <Modal
      open={open}
      title={t('githubRepos.title')}
      className={styles.modal}
      dataTestId="github-repos"
      onClose={onClose}
    >
      {isLoading ? (
        <div className={styles.status}>
          <span className={styles.spinner} aria-hidden="true" />
          <p>{t('githubRepos.loading')}</p>
        </div>
      ) : isError || !repos ? (
        <div className={styles.status}>
          <p>{t('githubRepos.error')}</p>
          <Button variant="ghost" onClick={() => void refetch()}>
            {t('githubRepos.retry')}
          </Button>
        </div>
      ) : repos.length === 0 ? (
        <div className={styles.status}>
          <p>{t('githubRepos.empty')}</p>
        </div>
      ) : (
        <div className={styles.list}>
          {repos.map((repo) => (
            <a
              key={repo.id}
              className={styles.repo}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.repoHead}>
                <span className={styles.repoName}>{repo.name}</span>
                <div className={styles.repoMeta}>
                  {repo.language ? <span>{repo.language}</span> : null}
                  {repo.stargazers_count > 0 ? <span>★ {repo.stargazers_count}</span> : null}
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </div>
              {repo.description ? <p className={styles.repoDesc}>{repo.description}</p> : null}
              <span className={styles.repoUpdated}>
                {t('githubRepos.updated')} {formatRelativeTime(repo.updated_at, i18n.language)}
              </span>
            </a>
          ))}
        </div>
      )}
    </Modal>
  )
}
