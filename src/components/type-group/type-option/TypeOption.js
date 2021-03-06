import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { pick } from 'lodash';
import styles from './TypeOption.css';

const INPUT_PROPS = ['id', 'name', 'value', 'defaultValue', 'onClick', 'onChange', 'onInput', 'onFocus', 'onBlur'];

class TypeOption extends Component {
    render() {
        const { label, groupName, children, selected, badge, selectable, className } = this.props;
        const labelClasses = classNames(styles.label, selectable && styles.selectable, !label && styles.noLabel);
        const inputProps = pick(this.props, INPUT_PROPS);

        return (
            <div className={ classNames(styles.container, className) }>
                <label className={ labelClasses }>
                    <input className={ styles.input }
                        type="radio"
                        name={ groupName }
                        checked={ selected }
                        disabled={ !selectable }
                        onChange={ this.handleInputChange }
                        { ...inputProps } />
                    <div className={ styles.circle }>
                        { badge &&
                            <span className={ styles.badge }>
                                { badge }
                            </span> }
                        { children }
                    </div>
                    { label && <span>{ label } </span> }
                </label>
            </div>
        );
    }

    handleInputChange = () => {
        this.props.onSelect && this.props.onSelect(this.props.id);
    };
}

TypeOption.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    groupName: PropTypes.string,
    className: PropTypes.string,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    badge: PropTypes.element,
    label: PropTypes.string,
    id: PropTypes.string,
};

TypeOption.defaultProps = {
    selectable: true,
    selected: false,
};

export default TypeOption;
