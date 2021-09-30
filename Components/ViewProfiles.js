import React, {Component} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ViewProfiles extends Component {
    getProfileImages = () => {
        var Images = new Array();

        return Images
    }

    render() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer 
                    imageUrls={this.getProfileImages}
                    index={0}
                    style={{width: 80, height: 80, borderRadius: 40, overflow: 'hidden', borderWidth: 3,}}
                />
            </Modal>
        )
    }
}