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
class ScrapingSource {

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $name;

	/**
	 * @var string
	 * @ORM\Column(length=2000)
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $url;

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $listHtmlSelector;

	/**
	 * @var string
	 */
	protected $titleHtmlSelector;

	/**
	 * @var string
	 */
	protected $leadHtmlSelector;


	/**
	 * @var string
	 */
	protected $detailUrlHtmlSelector;

	/**
	 * @var string
	 */
	protected $thumbnailHtmlSelector;

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 */
	protected $DetailHtmlSelector;

	/**
	 * @var string
	 */
	protected $authorHtmlSelector;

	/**
	 * @var string
	 */
	protected $dateHtmlSelector;

	/**
	 * @var string
	 */
	protected $bodyHtmlSelector;

	/**
	 * @var string
	 */
	protected $imageHtmlSelector;

	/**
	 * @var Category
	 * @ORM\ManyToOne
	 */
	protected $category;

	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param string $name
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * @param string $url
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	/**
	 * @return string
	 */
	public function getListHtmlSelector() {
		return $this->listHtmlSelector;
	}

	/**
	 * @param string $listHtmlSelector
	 */
	public function setListHtmlSelector($listHtmlSelector) {
		$this->listHtmlSelector = $listHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getDetailHtmlSelector() {
		return $this->DetailHtmlSelector;
	}

	/**
	 * @param string $DetailHtmlSelector
	 */
	public function setDetailHtmlSelector($DetailHtmlSelector) {
		$this->DetailHtmlSelector = $DetailHtmlSelector;
	}

	/**
	 * @return \WE\News\Domain\Model\Category
	 */
	public function getCategory() {
		return $this->category;
	}

	/**
	 * @param \WE\News\Domain\Model\Category $category
	 */
	public function setCategory($category) {
		$this->category = $category;
	}

	/**
	 * @return string
	 */
	public function getTitleHtmlSelector() {
		return $this->titleHtmlSelector;
	}

	/**
	 * @param string $titleHtmlSelector
	 */
	public function setTitleHtmlSelector($titleHtmlSelector) {
		$this->titleHtmlSelector = $titleHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getLeadHtmlSelector() {
		return $this->leadHtmlSelector;
	}

	/**
	 * @param string $leadHtmlSelector
	 */
	public function setLeadHtmlSelector($leadHtmlSelector) {
		$this->leadHtmlSelector = $leadHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getDetailUrlHtmlSelector() {
		return $this->detailUrlHtmlSelector;
	}

	/**
	 * @param string $detailUrlHtmlSelector
	 */
	public function setDetailUrlHtmlSelector($detailUrlHtmlSelector) {
		$this->detailUrlHtmlSelector = $detailUrlHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getThumbnailHtmlSelector() {
		return $this->thumbnailHtmlSelector;
	}

	/**
	 * @param string $thumbnailHtmlSelector
	 */
	public function setThumbnailHtmlSelector($thumbnailHtmlSelector) {
		$this->thumbnailHtmlSelector = $thumbnailHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getAuthorHtmlSelector() {
		return $this->authorHtmlSelector;
	}

	/**
	 * @param string $authorHtmlSelector
	 */
	public function setAuthorHtmlSelector($authorHtmlSelector) {
		$this->authorHtmlSelector = $authorHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getDateHtmlSelector() {
		return $this->dateHtmlSelector;
	}

	/**
	 * @param string $dateHtmlSelector
	 */
	public function setDateHtmlSelector($dateHtmlSelector) {
		$this->dateHtmlSelector = $dateHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getBodyHtmlSelector() {
		return $this->bodyHtmlSelector;
	}

	/**
	 * @param string $bodyHtmlSelector
	 */
	public function setBodyHtmlSelector($bodyHtmlSelector) {
		$this->bodyHtmlSelector = $bodyHtmlSelector;
	}

	/**
	 * @return string
	 */
	public function getImageHtmlSelector() {
		return $this->imageHtmlSelector;
	}

	/**
	 * @param string $imageHtmlSelector
	 */
	public function setImageHtmlSelector($imageHtmlSelector) {
		$this->imageHtmlSelector = $imageHtmlSelector;
	}

}
