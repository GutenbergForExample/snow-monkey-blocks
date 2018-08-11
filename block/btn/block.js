'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/btn', {
  title: __('Button', 'snow-monkey-awesome-custom-blocks'),
  icon: 'embed-generic',
  category: 'smacb',
  attributes: {
    content: {
      type: 'string'
    },
    url: {
      type: 'string',
    },
    target: {
      type: 'string',
      default: '_self'
    },
    modifier: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string'
    },
    textColor: {
      type: 'string'
    }
  },

  edit({ attributes, setAttributes }) {
    const { content, url, target, modifier, backgroundColor, textColor } = attributes;

    const optionsTarget = [
      {
        value: '_self',
        label: __('_self', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: '_blank',
        label: __('_blank', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    const optionsModifier = [
      {
        value: '',
        label: __('Normal button', 'snow-monkey-awesome-custom-blocks')
      },
      {
        value: 'full',
        label: __('Full button', 'snow-monkey-awesome-custom-blocks')
      }
    ];

    const onChangeContent = (value) => {
      value ? value : __('Button', 'snow-monkey-awesome-custom-blocks');
      setAttributes({ content: value });
    };

    const onChangeURL = (value) => {
      setAttributes({ url: value });
    };

    const onChangeTarget = (value) => {
      setAttributes({ target: value });
    };

    const onChangeModifier = (value) => {
      setAttributes({ modifier: value });
    };

    const onChangeBackgroundColor = (value) => {
      setAttributes({ backgroundColor: value });
    };

    const onChangeTextColor = (value) => {
      setAttributes({ textColor: value });
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Button Settings', 'snow-monkey-awesome-custom-blocks') }>
            <TextControl
              label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
              value={ url }
              onChange={ onChangeURL }
            />
            <SelectControl
              label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
              value={ target }
              onChange={ onChangeTarget }
              options={ optionsTarget }
            />
            <SelectControl
              label={ __('Type', 'snow-monkey-awesome-custom-blocks') }
              value={ modifier }
              onChange={ onChangeModifier }
              options={ optionsModifier }
            />
          </PanelBody>
          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: onChangeBackgroundColor,
                label: __('Background Color', 'snow-monkey-awesome-custom-blocks'),
              },
              {
                value: textColor,
                onChange: onChangeTextColor,
                label: __('Text Color', 'snow-monkey-awesome-custom-blocks'),
              },
            ] }
            >
          </PanelColorSettings>
        </InspectorControls>

        <span
          className={ classnames('smacb-btn', { [`smacb-btn--${modifier}`]: !! modifier }) } href={ url } target={ target }
          style={ { backgroundColor: backgroundColor } }
          >
          <span className="smacb-btn__label">
            <RichText
              format="string"
              value={ content }
              placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
              onChange={ onChangeContent }
              style={ { color: textColor } }
              formattingControls={ [] }
            />
          </span>
        </span>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { content, url, target, modifier, backgroundColor, textColor } = attributes;

    return (
      <a
        className={ classnames('smacb-btn', { [`smacb-btn--${modifier}`]: !! modifier }) }
        href={ url }
        target={ target }
        style={ { backgroundColor: backgroundColor } }
        >
        <span className="smacb-btn__label" style={ { color: textColor } }>
          { content }
        </span>
      </a>
    );
  },
} );