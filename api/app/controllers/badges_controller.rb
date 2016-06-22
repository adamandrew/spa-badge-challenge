class BadgesController < ApplicationController
  def create
    badge = Badge.new(phrase: params[:phrase], votes: params[:votes], teacher_id: params[:teacher_id])
    badge.save
    badge_json = badge.to_json
    render json: badge_json
  end

  def vote
    badge_id = params[:badge_id]
    input = params[:vote_type]
    badge = Badge.find(badge_id)
    if input == "up"
      badge.votes += 1
      badge.save
    elsif input == "down"
      badge.votes -= 1
      badge.save
    end
    badge_json = badge.to_json
    render json: badge_json
  end
end
