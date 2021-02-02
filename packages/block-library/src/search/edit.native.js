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
	TextControl,
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
// eslint-disable-next-line no-unused-vars
const MIN_WIDTH = 220;

export default function SearchEdit( {
	className,
	attributes,
	setAttributes,
	// eslint-disable-next-line no-unused-vars
	toggleSelection,
	// eslint-disable-next-line no-unused-vars
	isSelected,
} ) {
	const {
		label,
		showLabel,
		placeholder,
		// eslint-disable-next-line no-unused-vars
		width,
		// eslint-disable-next-line no-unused-vars
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

	// eslint-disable-next-line no-unused-vars
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
			<TextControl
				className="wp-block-search__input"
				label={ null }
				value={ placeholder }
				help={ __( 'Optional placeholder text' ) }
				onChangeValue={ ( newVal ) =>
					setAttributes( { placeholder: newVal } )
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

			{ ( 'button-inside' === buttonPosition ||
				'button-outside' === buttonPosition ) && (
				<>
					{ renderTextField() }
					{ renderButton() }
				</>
			) }

			{ 'button-only' === buttonPosition && renderButton() }
			{ 'no-button' === buttonPosition && renderTextField() }
		</View>
	);
}
