import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PreloadImage from 'react-image';
import { getInitials } from '../../utils';
import styles from './Avatar.css';

const cssTransitionStyles = {
    appear: styles.enter,
    appearActive: styles.enterActive,
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};

const imageContainer = memoizeOne((animateImageOnEnter) => (children) => (
    <TransitionGroup appear={ animateImageOnEnter } component={ null }>
        <CSSTransition classNames={ cssTransitionStyles } timeout={ 300 }>
            { children }
        </CSSTransition>
    </TransitionGroup>
));

const Avatar = ({ className, name, image, preloadImage, animateImageOnEnter, ...rest }) => {
    const avatarClasses = classNames(styles.avatar, className);

    return (
        <div { ...rest } className={ avatarClasses }>
            <span className={ styles.initials }> { getInitials(name) || '?' } </span>
            <PreloadImage
                src={ image }
                decode={ preloadImage }
                container={ imageContainer(animateImageOnEnter) }
                className={ styles.image } />
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string,
    preloadImage: PropTypes.bool,
    animateImageOnEnter: PropTypes.bool,
};

Avatar.defaultProps = {
    preloadImage: true,
    animateImageOnEnter: true,
};

export default Avatar;
