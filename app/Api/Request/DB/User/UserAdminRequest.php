<?php

namespace App\Api\Request\DB\User;


use App\Api\Request\Request;
use App\Api\Response\Response;
use App\User;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UserAdminRequest extends Request
{

    /** @var Guard */
    protected $guard;

    /**
     * @param Guard $guard
     */
    public function __construct(Guard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * @inheritDoc
     */
    protected function shouldResolve()
    {
        /** @var User | null $user */
        $user = $this->guard->user();

        return $user && $user->is_admin;
    }

    /**
     * @inheritDoc
     */
    protected function rules(Validator $validator = null)
    {
        return [
            'username' => 'required|string',
            'status' => [
                'required',
                'integer',
                Rule::in([User::STATUS_ACTIVE, User::STATUS_BANNED]),
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function doResolve($name, Collection $parameters)
    {
        /** @var User | null $user */
        $user = User::query()->where([
            'username' => $parameters['username'],
        ])->first();

        $success = false;

        if ($user) {
            $user->status = $parameters['status'];
            $success      = $user->save();
        }

        return new Response($success, new \App\Http\Resources\User($user));
    }
}