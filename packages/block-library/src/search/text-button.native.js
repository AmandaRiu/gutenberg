/**
 * External dependencies
 */
import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import styles from './style.scss';

export default function TextButton( { value, placeholder, onChange } ) {
    const [ textWidth, setTextWidth ] = useState( 0 );

    const onTextChanged = ( html ) => {
        onChange( html );
    };

    const getTextWidth = ( text ) => {
        return (
            <Text
                style={ styles.placeholder }
                onTextLayout={ ( { nativeEvent } ) => {
                    const newTextWidth =
                        nativeEvent.lines[ 0 ] && nativeEvent.lines[ 0 ].width;
                    if ( newTextWidth !== textWidth ) {
                        setTextWidth( newTextWidth );
                    }
                } }
            >
                { text }
            </Text>
        );
    };

    const textValue = value ? value : placeholder;
    return (
        <View
            style={ styles.buttonContainer }>
            { getTextWidth( textValue ) }
            <RichText
                placeholder={ placeholder }
                value={ value }
                identifier="text"
                withoutInteractiveFormatting
                onChange={ onTextChanged }
                textAlign="center"
                minWidth={ textWidth }
            />
        </View>
    );
}
