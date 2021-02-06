/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './style.scss';

export default function TextButton( { value, onChange } ) {
    const onTextChanged = ( html ) => {
        onChange( html );
    };

    return (
        <View style={ styles.buttonContainer }>
            <RichText
                placeholder={ __( 'Button text…' ) }
                value={ value }
                identifier="text"
                withoutInteractiveFormatting
                onChange={ onTextChanged }
                textAlign="center"
            />
        </View>
    );
}
