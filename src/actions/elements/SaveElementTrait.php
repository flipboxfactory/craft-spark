<?php

/**
 * @copyright  Copyright (c) Flipbox Digital Limited
 * @license    https://github.com/flipboxfactory/craft-ember/blob/master/LICENSE
 * @link       https://github.com/flipboxfactory/craft-ember/
 */

namespace flipbox\craft\ember\actions\elements;

use craft\base\ElementInterface;
use flipbox\craft\ember\actions\PopulateTrait;

/**
 * @author Flipbox Factory <hello@flipboxfactory.com>
 * @since 2.0.0
 *
 * @method ElementInterface populate(ElementInterface $object);
 */
trait SaveElementTrait
{
    use PopulateTrait, ManageElementTrait;

    /**
     * @inheritdoc
     * @param ElementInterface $element
     * @throws \yii\base\Exception
     * @throws \yii\web\UnauthorizedHttpException
     */
    public function runInternal(ElementInterface $element)
    {
        // Populate
        $this->populate($element);

        // Check access
        if (($access = $this->checkAccess($element)) !== true) {
            return $access;
        }

        if (!$this->performAction($element)) {
            return $this->handleFailResponse($element);
        }

        return $this->handleSuccessResponse($element);
    }
}
