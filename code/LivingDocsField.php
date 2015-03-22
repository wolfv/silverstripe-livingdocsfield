<?php
class LivingDocsField extends TextareaField {

	protected $livingDocsConfig = array();
	protected $template = 'LivingDocsField';
	protected $LivingDocsBaseUrl = LIVINGDOCS_MODULE;
	function Field($properties = array()) {
		Requirements::javascript(LIVINGDOCS_MODULE. '/js/bower_components/jquery/dist/jquery_2.1.3.js');
		Requirements::javascript(LIVINGDOCS_MODULE. '/js/jquery_noconflict.js');
		$properties["design"] = LIVINGDOCS_MODULE . '/js/design/dist/design.js';
		Requirements::javascript($properties["design"]);
		Requirements::javascript(LIVINGDOCS_MODULE . '/js/bower_components/editable/editable.js');
		Requirements::javascript(LIVINGDOCS_MODULE . '/js/bower_components/livingdocs-engine/dist/livingdocs-engine.js');
		Requirements::css(LIVINGDOCS_MODULE . '/css/livingdocs-field.css');
		Requirements::javascript(LIVINGDOCS_MODULE . '/js/livingdocs-field.js');
		
		Requirements::css(LIVINGDOCS_MODULE . '/js/bower_components/livingdocs-engine/dist/css/livingdocs.css');
		return $this->renderWith($this->getTemplate());
	}

	public function setLivingDocsConfig($k, $v){
		$this->livingDocsConfig[$k] = $v;
		return $this;
	}

	public function getLivingDocsConfig($k = null){
		return $k ? $this->livingDocsConfig[$k] : $this->livingDocsConfig;
	}

}