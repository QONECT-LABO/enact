/*
 * Exports the {@link moonstone/VirtualList.GridListImageItem} and
 * {@link moonstone/VirtualList.GridListImageItemBase} components. The default export is
 * {@link moonstone/VirtualList.GridListImageItem}.
 *
 * Not a jsdoc module def on purpose. Exported elsewhere.
 */

import deprecate from '@enact/core/internal/deprecate';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';

import Icon from '../Icon';
import {Image} from '../Image';
import {MarqueeController, MarqueeText} from '../Marquee';
import Skinnable from '../Skinnable';

import css from './GridListImageItem.less';

const defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
	'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
	'4NCg==';

/**
 * {@link moonstone/VirtualList.GridListImageItemBase} is a stateless GridListImageItem with
 * Moonstone styling applied.
 *
 * @class GridListImageItemBase
 * @memberof moonstone/VirtualList
 * @ui
 * @public
 * @deprecated since 1.14.0. Replaced by [moonstone/GridListImageItem.GridListImageItemBase]{@link moonstone/GridListImageItem.GridListImageItemBase}
 */
const GridListImageItemBase = deprecate(kind({
	name: 'GridListImageItem',

	propTypes: /** @lends moonstone/VirtualList.GridListImageItemBase.prototype */ {
		/**
		 * The absolute URL path to the image.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		source: PropTypes.string.isRequired,

		/**
		 * The primary caption to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		caption: PropTypes.string,

		/**
		 * Placeholder image used while [source]{@link moonstone/VirtualList.GridListImageItemBase#source}
		 * is loaded.
		 *
		 * @type {String}
		 * @default 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
		 * '9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
		 * 'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
		 * '4NCg==';
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * When `true`, applies a selected visual effect to the image, but only if `selectionOverlayShowing`
		 * is also `true`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The custom selection overlay component to render. A component can be a stateless functional
		 * component, `kind()` or React component. The following is an example with custom selection
		 * overlay kind.
		 *
		 * Example Usage:
		 * ```
		 * const SelectionOverlay = kind({
		 * 	render: () => <div>custom overlay</div>
		 * });
		 *
		 * <GridListImageItemBase selectionOverlay={SelectionOverlay} />
		 * ```
		 *
		 * @type {Function}
		 * @public
		 */
		selectionOverlay: PropTypes.func,

		/**
		 * When `true`, a selection overlay with a centered icon is shown. When `selected` is true,
		 * a check mark is shown.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selectionOverlayShowing: PropTypes.bool,

		/**
		 * The second caption line to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		subCaption: PropTypes.string
	},

	defaultProps: {
		placeholder: defaultPlaceholder,
		selected: false,
		selectionOverlayShowing: false
	},

	styles: {
		css,
		className: 'gridListImageItem'
	},

	computed: {
		className: ({caption, selected, styler, subCaption}) => styler.append(
			{selected},
			caption ? 'useCaption' : null,
			subCaption ? 'useSubCaption' : null
		),
		selectionOverlay: ({selectionOverlay: SelectionOverlay, selectionOverlayShowing}) => {
			if (selectionOverlayShowing) {
				return (
					<div className={css.overlayContainer}>
						{
							SelectionOverlay ?
								<SelectionOverlay /> :
								<div className={css.overlayComponent}>
									<Icon className={css.icon}>check</Icon>
								</div>
						}
					</div>
				);
			}
		}
	},

	render: ({caption, placeholder, source, subCaption, selectionOverlay, ...rest}) => {
		if (selectionOverlay) {
			rest['role'] = 'checkbox';
			rest['aria-checked'] = rest.selected;
		}

		delete rest.selected;
		delete rest.selectionOverlayShowing;

		return (
			<div {...rest}>
				<Image className={css.image} placeholder={placeholder} src={source}>
					{selectionOverlay}
				</Image>
				{caption ? (<MarqueeText alignment="center" className={css.caption} marqueeOn="hover">{caption}</MarqueeText>) : null}
				{subCaption ? (<MarqueeText alignment="center" className={css.subCaption} marqueeOn="hover">{subCaption}</MarqueeText>) : null}
			</div>
		);
	}
}), {name: 'moonstone/VirtualList.GridListImageItemBase', since: '1.14.0', until: '2.0.0', replacedBy: 'moonstone/GridListImageItemBase'});

/**
 * {@link moonstone/VirtualList.GridListImageItem} is a GridListImageItem with
 * Moonstone styling, Spottable applied.
 *
 * Usage:
 * ```
 * <GridListImageItem source="http://placehold.it/300x300/9037ab/ffffff&text=Image0" caption="image0" subCaption="sub-image0" />
 * ```
 *
 * @class GridListImageItem
 * @memberof moonstone/VirtualList
 * @mixes moonstone/Marquee.MarqueeController
 * @mixes spotlight.Spottable
 * @see moonstone/VirtualList.GridListImageItemBase
 * @ui
 * @public
 * @deprecated since 1.14.0. Replaced by [moonstone/GridListImageItem.GridListImageItem]{@link moonstone/GridListImageItem.GridListImageItem}
 */
const GridListImageItem = MarqueeController(
	{marqueeOnFocus: true},
	Spottable(
		Skinnable(
			deprecate(
				GridListImageItemBase,
				{name: 'moonstone/VirtualList.GridListImageItem', since: '1.14.0', until: '2.0.0', replacedBy: 'moonstone/GridListImageItem'}
			)
		)
	)
);

export default GridListImageItem;
export {GridListImageItem, GridListImageItemBase};
