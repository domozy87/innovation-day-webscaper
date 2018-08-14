<?php
namespace WE\News\Controller;

/*
 * This file is part of the WE.News package.
 */

use TYPO3\Flow\Annotations as Flow;
use TYPO3\Flow\Mvc\Controller\ActionController;
use WE\News\Domain\Model\News;

class NewsController extends ActionController {

	/**
	 * @Flow\Inject
	 * @var \WE\News\Domain\Repository\NewsRepository
	 */
	protected $newsRepository;

	/**
	 * @return void
	 */
	public function indexAction() {
		$this->view->assign('news', $this->newsRepository->findAll());
	}

	/**
	 * @param \WE\News\Domain\Model\News $news
	 *
	 * @return void
	 */
	public function showAction(News $news) {
		$this->view->assign('news', $news);
	}

}
