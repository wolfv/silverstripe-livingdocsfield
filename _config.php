<?php
define('LIVINGDOCS_MODULE', 'livingdocsfield');
if (basename(dirname(__FILE__)) != LIVINGDOCS_MODULE) {
	throw new Exception(LIVINGDOCS_MODULE . ' module not installed in correct directory');
}