import classes from './index.module.scss'

export function PublicLayout({ children }) {
  return (
    <div className={[classes['layout-container']]}>
      <div className={classes.layout__content}>
        <div className={classes['layout__main-content']}>{children}</div>
      </div>
    </div>
  )
}
