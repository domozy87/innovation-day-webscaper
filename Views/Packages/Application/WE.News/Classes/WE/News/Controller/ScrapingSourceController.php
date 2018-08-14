<?php
namespace WE\News\Controller;

/*
 * This file is part of the WE.News package.
 */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use WE\News\Domain\Model\ScrapingSource;

class ScrapingSourceController extends ActionController {

	/**
	 * @Flow\Inject
	 * @var \WE\News\Domain\Repository\ScrapingSourceRepository
	 */
	protected $scrapingSourceRepository;

	/**
	 * @Flow\Inject
	 * @var \WE\News\Domain\Repository\CategoryRepository
	 */
	protected $categoryRepository;

	/**
	 * @return void
	 */
	public function indexAction() {
		$this->view->assign('scrapingSources', $this->scrapingSourceRepository->findAll());
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $scrapingSource
	 *
	 * @return void
	 */
	public function showAction(ScrapingSource $scrapingSource) {
		$this->view->assign('scrapingSource', $scrapingSource);
	}

	/**
	 * @return void
	 */
	public function newAction() {
		$this->view->assign('categories', $this->categoryRepository->findAll());
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $newScrapingSource
	 *
	 * @return void
	 */
	public function createAction(ScrapingSource $newScrapingSource) {
		$this->scrapingSourceRepository->add($newScrapingSource);
		$this->addFlashMessage('Created a new scraping source.');
		$this->redirect('index');
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $scrapingSource
	 *
	 * @return void
	 */
	public function editAction(ScrapingSource $scrapingSource) {
		$this->view->assign('categories', $this->categoryRepository->findAll());
		$this->view->assign('scrapingSource', $scrapingSource);
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $scrapingSource
	 *
	 * @return void
	 */
	public function updateAction(ScrapingSource $scrapingSource) {
		$this->scrapingSourceRepository->update($scrapingSource);
		$this->addFlashMessage('Updated the scraping source.');
		$this->redirect('index');
	}

	/**
	 * @param \WE\News\Domain\Model\ScrapingSource $scrapingSource
	 *
	 * @return void
	 */
	public function deleteAction(ScrapingSource $scrapingSource) {
		$this->scrapingSourceRepository->remove($scrapingSource);
		$this->addFlashMessage('Deleted a scraping source.');
		$this->redirect('index');
	}

}
