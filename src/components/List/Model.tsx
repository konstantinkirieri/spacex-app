import S from './styles.module.css'

class ListModel {
  successFailure(success: boolean | null) {
    if (success === null) return 'Status: Planned'

    if (success) {
      return (
        <span>
          Status:{' '}
          <span className={S.success}> Success</span>
        </span>
      )
    } else {
      return (
        <span>
          Status:<span className={S.failure}> Failure</span>
        </span>
      )
    }
  }

  unixTimeToNormal(unix_time: number) {
    const milliseconds = unix_time * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    return dateObject.toLocaleString('ru-RU')
  }
}

export const listModel = new ListModel()
