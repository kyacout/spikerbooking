import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { imageURL } from '../../helpers/Cloudinary'
import styles from './styles.module.scss'
import { HeaderProfileDropDown } from './HeaderProfileDropdown/HeaderProfileDropDown'
import { Context } from '../App'
import { HeaderQuickLinks } from './HeaderQuickLinks/HeaderQuickLinks'

export const Header = () => {
  const { currentUser } = useContext(Context)
  const history = useHistory()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={imageURL('v1635321933/logo_colored.jpg')} alt="logo" onClick={() => history.push('/')} />
      </div>
      <HeaderQuickLinks />
      <HeaderProfileDropDown currentUser={currentUser} />
    </header>
  )
}
