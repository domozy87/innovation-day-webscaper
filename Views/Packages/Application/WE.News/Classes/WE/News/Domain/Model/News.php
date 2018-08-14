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
class News {

	/**
	 * @var string
	 * @Flow\Validate(type="NotEmpty")
	 *
	 */
	protected $title;

	/**
	 * @var string
	 * @ORM\Column(type="text", nullable=true)
	 */
	protected $lead;

	/**
	 * @var string
	 * @ORM\Column(type="text")
	 */
	protected $body;

	/**
	 * @var string
	 * @ORM\Column(nullable=true)
	 */
	protected $author;

	/**
	 * @var \DateTime
	 */
	protected $crDate;

	/**
	 * @var ScrapingSource
	 * @ORM\ManyToOne
	 */
	protected $scrapingSource;

	/**
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * @return string
	 */
	public function getLead() {
		return $this->lead;
	}

	/**
	 * @param string $lead
	 */
	public function setLead($lead) {
		$this->lead = $lead;
	}

	/**
	 * @return string
	 */
	public function getBody() {
		return $this->body;
	}

	/**
	 * @param string $body
	 */
	public function setBody($body) {
		$this->body = $body;
	}

	/**
	 * @return string
	 */
	public function getAuthor() {
		return $this->author;
	}

	/**
	 * @param string $author
	 */
	public function setAuthor($author) {
		$this->author = $author;
	}

	/**
	 * @return \DateTime
	 */
	public function getCrDate() {
		return $this->crDate;
	}

	/**
	 * @param \DateTime $crDate
	 */
	public function setCrDate($crDate) {
		$this->crDate = $crDate;
	}

	/**
	 * @return \WE\News\Domain\Model\ScrapingSource
	 */
	public function getScrapingSource() {
		return $this->scrapingSource;
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $scrapingSource
	 */
	public function setScrapingSource($scrapingSource) {
		$this->scrapingSource = $scrapingSource;
	}

}
