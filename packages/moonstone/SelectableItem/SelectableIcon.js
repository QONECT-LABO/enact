/**
 * Provides Moonstone-themed checkmark in a circle component and interactive togglable capabilities.
 *
 * @example
 * <Selectable />
 *
 * @module moonstone/Selectable
 * @exports Selectable
 * @exports SelectableBase
 * @exports SelectableDecorator
 */

import kind from '@enact/core/kind';
import React from 'react';
import compose from 'ramda/src/compose';
import Pure from '@enact/ui/internal/Pure';
import ToggleIcon from '@enact/ui/ToggleIcon';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './SelectableItem.less';

/**
 * Renders a check mark in a shape which supports a Boolean state.
 *
 * @class SelectableBase
 * @memberof moonstone/Selectable
 * @extends ui/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const SelectableBase = kind({
	name: 'Selectable',

	styles: {
		css: componentCss,
        className: 'selectableIcon',
        publicClassNames: ['selectableIcon', 'dot']
	},

	render: ({css, ...props}) => {
        console.log(componentCss.dot);
        console.log(props.css);
		return (
			<ToggleIcon css={css} {...props} iconComponent={Icon}>circle</ToggleIcon>
		);
	}
});

/**
 * Moonstone-specific behaviors to apply to `SelectableBase`.
 *
 * @hoc
 * @memberof moonstone/Selectable
 * @mixes moonstone/Skinnable.Skinnable
 * @public
 */
const SelectableDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A fully functional, ready-to-use, component.
 *
 * @class Selectable
 * @memberof moonstone/Selectable
 * @extends moonstone/Selectable.SelectableBase
 * @mixes moonstone/Selectable.SelectableDecorator
 * @ui
 * @public
 */
const Selectable = SelectableDecorator(SelectableBase);

export default Selectable;
export {
	Selectable,
	SelectableBase,
	SelectableDecorator
};
