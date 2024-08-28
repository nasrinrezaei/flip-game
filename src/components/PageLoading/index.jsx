import classes from './index.module.scss'

export default function PageLoading() {
  return (
    <div className={classes['page-loading']}>
      <div className={classes['sk-chase']}>
        {new Array(6).fill(1).map((_, i) => (
          <div key={i} className={classes['sk-chase-dot']} />
        ))}
      </div>
    </div>
  )
}
