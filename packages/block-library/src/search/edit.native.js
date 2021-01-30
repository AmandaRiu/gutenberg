/**
 * External dependencies
 */
import classnames from 'classnames';
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	Button,
	ToolbarButton,
	ResizableBox,
} from '@wordpress/components';
import { search } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { buttonWithIcon, toggleLabel } from './icons';
import ButtonPositionDropdown from './button-position-dropdown.native';

/**
 * Constants
 */
const MIN_WIDTH = 220;

export default function SearchEdit( {
	className,
	attributes,
	setAttributes,
	toggleSelection,
	isSelected,
} ) {
	const {
		label,
		showLabel,
		placeholder,
		width,
		widthUnit,
		align,
		buttonText,
		buttonPosition,
		buttonUseIcon,
	} = attributes;

	const getBlockClassNames = () => {
		return classnames(
			className,
			'button-inside' === buttonPosition
				? 'wp-block-search__button-inside'
				: undefined,
			'button-outside' === buttonPosition
				? 'wp-block-search__button-outside'
				: undefined,
			'no-button' === buttonPosition
				? 'wp-block-search__no-button'
				: undefined,
			'button-only' === buttonPosition
				? 'wp-block-search__button-only'
				: undefined,
			! buttonUseIcon && 'no-button' !== buttonPosition
				? 'wp-block-search__text-button'
				: undefined,
			buttonUseIcon && 'no-button' !== buttonPosition
				? 'wp-block-search__icon-button'
				: undefined
		);
	};

	const getResizableSides = () => {
		if ( 'button-only' === buttonPosition ) {
			return {};
		}

		return {
			right: align === 'right' ? false : true,
			left: align === 'right' ? true : false,
		};
	};

	const renderTextField = () => {
		return (
			<input
				className="wp-block-search__input"
				aria-label={ __( 'Optional placeholder text' ) }
				// We hide the placeholder field's placeholder when there is a value. This
				// stops screen readers from reading the placeholder field's placeholder
				// which is confusing.
				placeholder={
					placeholder ? undefined : __( 'Optional placeholder…' )
				}
				value={ placeholder }
				onChange={ ( event ) =>
					setAttributes( { placeholder: event.target.value } )
				}
			/>
		);
	};

	const renderButton = () => {
		return (
			<View>
				{ buttonUseIcon && (
					<Button
						icon={ search }
						className="wp-block-search__button"
					/>
				) }

				{ ! buttonUseIcon && (
					<RichText
						className="wp-block-search__button"
						aria-label={ __( 'Button text' ) }
						placeholder={ __( 'Add button text…' ) }
						withoutInteractiveFormatting
						value={ buttonText }
						onChange={ ( html ) =>
							setAttributes( { buttonText: html } )
						}
					/>
				) }
			</View>
		);
	};

	const handleBlockPositionChange = ( position ) => {
		setAttributes( {
			buttonPosition: position,
		} );
	};

	const controls = (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						title={ __( 'Toggle search label' ) }
						icon={ toggleLabel }
						onClick={ () => {
							setAttributes( {
								showLabel: ! showLabel,
							} );
						} }
						isActive={ showLabel }
					/>

					<ButtonPositionDropdown
						selectedOption={ buttonPosition }
						onChange={ handleBlockPositionChange }
					/>

					{ 'no-button' !== buttonPosition && (
						<ToolbarButton
							title={ __( 'Use button with icon' ) }
							icon={ buttonWithIcon }
							onClick={ () => {
								setAttributes( {
									buttonUseIcon: ! buttonUseIcon,
								} );
							} }
							isActive={ buttonUseIcon }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
		</>
	);

	const blockProps = useBlockProps( {
		className: getBlockClassNames(),
	} );

	return (
		<View { ...blockProps }>
			{ controls }

			{ showLabel && (
				<RichText
					className="wp-block-search__label"
					aria-label={ __( 'Label text' ) }
					placeholder={ __( 'Add label…' ) }
					withoutInteractiveFormatting
					value={ label }
					onChange={ ( html ) => setAttributes( { label: html } ) }
				/>
			) }

			<ResizableBox
				size={ {
					width: `${ width }${ widthUnit }`,
				} }
				className="wp-block-search__inside-wrapper"
				minWidth={ MIN_WIDTH }
				enable={ getResizableSides() }
				onResizeStart={ ( event, direction, elt ) => {
					setAttributes( {
						width: parseInt( elt.offsetWidth, 10 ),
						widthUnit: 'px',
					} );
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						width: parseInt( width + delta.width, 10 ),
					} );
					toggleSelection( true );
				} }
				showHandle={ isSelected }
			>
				{ ( 'button-inside' === buttonPosition ||
					'button-outside' === buttonPosition ) && (
					<>
						{ renderTextField() }
						{ renderButton() }
					</>
				) }

				{ 'button-only' === buttonPosition && renderButton() }
				{ 'no-button' === buttonPosition && renderTextField() }
			</ResizableBox>
		</View>
	);
}
