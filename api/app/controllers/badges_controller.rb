class BadgesController < ApplicationController
  def create
    badge = Badge.new(phrase: params[:phrase], votes: params[:votes], teacher_id: params[:teacher_id])
    badge.save
    badge_json = badge.to_json
    render json: badge_json
  end
end
