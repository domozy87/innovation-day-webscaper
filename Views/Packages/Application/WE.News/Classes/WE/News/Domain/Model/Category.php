<?php
namespace WE\News\Domain\Model;

/*
 * This file is part of the WE.News package.
 */

use TYPO3\Flow\Annotations as Flow;
use Doctrine\ORM\Mapping as ORM;

/**
 * @Flow\Entity
 */
class Category {

	/**
	 * @var string
	 */
	protected $name;

	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param string $name
	 *
	 * @return void
	 */
	public function setName($name) {
		$this->name = $name;
	}

}
