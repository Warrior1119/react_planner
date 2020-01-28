import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Grids } from './export';

export default class Scene extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.scene.hashCode() !== nextProps.scene.hashCode();
  }

  render() {
    let { scene, catalog } = this.props;
    let { height, layers } = scene;
    let selectedLayer = layers.get(scene.selectedLayer);

    console.log('background', scene.background);
    return (
      <g>
        <Grids scene={scene} />
        <svg
          width={scene.width}
          height={scene.height}
          dangerouslySetInnerHTML={{ __html: `<image id="img1" width="${scene.width}" height="${scene.height}" xlink: href="${scene.background}"></image>` }} />
        <g style={{ pointerEvents: 'none' }}>
          {
            layers
              .entrySeq()
              .filter(([layerID, layer]) => layerID !== scene.selectedLayer && layer.visible)
              .map(([layerID, layer]) => <Layer key={layerID} layer={layer} scene={scene} catalog={catalog} />)
          }
        </g>

        <Layer key={selectedLayer.id} layer={selectedLayer} scene={scene} catalog={catalog} />
      </g >
    );
  }
}


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
