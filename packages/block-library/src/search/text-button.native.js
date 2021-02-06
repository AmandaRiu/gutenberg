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

export default function TextButton( { value, onChange } ) {
    const onTextChanged = ( html ) => {
        onChange( html );
    };

    return (
        <View>
            <RichText
                placeholder={ __( 'Add button text…' ) }
                value={ value }
                identifier="text"
                withoutInteractiveFormatting
                onChange={ onTextChanged }
            />
        </View>
    );
}
