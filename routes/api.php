<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'Auth\AuthController@register');
Route::post('/login', 'Auth\AuthController@login');

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/users', 'UserController@index');
    
    Route::get('/contacts', 'ContactController@index');
    Route::get('/contact/{id}', 'ContactController@show');
    Route::post('/contact', 'ContactController@store');
    Route::put('/contact/{id}', 'ContactController@update');
    Route::delete('/contact/{id}', 'ContactController@destroy');
    Route::post('/logout', 'Auth\AuthController@logout');
});

