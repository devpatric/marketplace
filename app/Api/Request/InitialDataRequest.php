<?php

namespace App\Api\Request;

use Illuminate\Http\Request as HttpRequest;

/**
 * Request that contains variables that the frontend might require at the beginning of its existence.
 * Extends {@see GlobalRequest}.
 */
class InitialDataRequest extends GlobalDataRequest
{
    public static function get(HttpRequest $request)
    {
        $array = parent::get($request);

        $array['messages'] = [
            'validation' => [
                'min' => trans('validation.min.string'),
                'max' => trans('validation.max.string'),
                'required' => trans('validation.required'),
                'slug' => trans('validation.slug'),
                'numeric' => trans('validation.numeric'),
                'containsNumeric' => trans('validation.contains.numeric'),
                'containsNonNumeric' => trans('validation.contains.non_numeric'),
                'confirmed' => trans('validation.confirmed'),
                'email' => trans('validation.email'),
                'image' => trans('validation.image'),
            ]
        ];

        return $array;
    }
}
