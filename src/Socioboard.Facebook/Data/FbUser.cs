﻿using Facebook;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Socioboard.Facebook.Data
{
    public static class FbUser
    {
        public static object getFbUser(string accessToken)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.6/me?fields=id,about,bio,birthday,cover,education,email,gender,hometown,name,work");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }

        public static Int64 getFbFriends(string accessToken)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            dynamic friends = fb.Get("v2.1/me/friends");
            try
            {
                return Convert.ToInt64(friends["summary"]["total_count"].ToString());
            }
            catch (Exception ex)
            {
                return 0;
            }
        }



        public static dynamic getFeeds(string accessToken)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/me/feed?limit=99");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }

        public static dynamic getFeeds(string accessToken, string facebookid)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/" + facebookid + "/posts?limit=99");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }

        public static dynamic getFeedDetail(string accessToken, string PostId)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/" + PostId + "?fields=likes.summary(true),comments.summary(true),shares");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }
        public static dynamic postdetails(string accessToken, string PostId)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/" + PostId + "/insights");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }

        public static dynamic conversations(string accessToken)
        {

            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/me/conversations");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }

        public static dynamic getPostComments(string accessToken, string postid)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get("v2.1/" + postid + "/comments?limit=99");
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }


        public static string postComments(string accessToken, string postid, string message)
        {
            var args = new Dictionary<string, object>();
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            args["message"] = message;
            try
            {
                return fb.Post("v2.1/" + postid + "/comments", args).ToString();
            }
            catch (Exception)
            {
                return "Invalid Access Token";
            }
        }

        public static dynamic fbGet(string accessToken, string Url)
        {
            FacebookClient fb = new FacebookClient();
            fb.AccessToken = accessToken;
            try
            {
                return fb.Get(Url);
            }
            catch (Exception ex)
            {
                return "Invalid Access Token";
            }
        }


        public static string SetPrivacy(string privacy, FacebookClient fb, string fbUserId)
        {
            try
            {
                JObject Jdata = null;
                string JValue = string.Empty;

                if (!string.IsNullOrEmpty(privacy))
                {
                    if (privacy == "Close Friends")
                    {
                        Jdata = JObject.Parse(fb.Get("/" + fbUserId + "/friendlists/close_friends").ToString());
                        string closefrndid = Jdata["data"][0]["id"].ToString();
                        JValue = "{ \"description\": \"Close Friends\",\"value\": \"CUSTOM\",\"friends\": \"SOME_FRIENDS\",\"networks\": \"\",\"allow\":\"" + closefrndid + "\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Only Me")
                    {
                        JValue = "{\"description\": \"Only Me\",\"value\": \"SELF\",\"friends\": \"\",\"networks\": \"\",\"allow\": \"\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Friends")
                    {
                        JValue = "{\"description\": \"Your friends\",\"value\": \"ALL_FRIENDS\",\"friends\": \"\",\"networks\": \"\",\"allow\": \"\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Friends of Friends")
                    {
                        JValue = "{\"description\": \"Your friends of friends\",\"value\": \"FRIENDS_OF_FRIENDS\",\"friends\": \"\",\"networks\": \"\",\"allow\": \"\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Family")
                    {
                        Jdata = JObject.Parse(fb.Get("/" + fbUserId + "/friendlists/family").ToString());
                        string familyid = Jdata["data"][0]["id"].ToString();
                        JValue = "{\"description\": \"Family\",\"value\": \"CUSTOM\",\"friends\": \"SOME_FRIENDS\",\"networks\": \"\",\"allow\": \"" + familyid + "\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Public")
                    {
                        JValue = "{\"description\": \"Public\",\"value\": \"EVERYONE\",\"friends\": \"\",\"networks\": \"\",\"allow\": \"\",\"deny\": \"\"}";
                    }
                    else if (privacy == "Acquaintances")
                    {
                        Jdata = JObject.Parse(fb.Get("/" + fbUserId + "/friendlists/acquaintances").ToString());
                        string AcquaintancesId = Jdata["data"][0]["id"].ToString();
                        JValue = "{\"description\": \"Acquaintances\",\"value\": \"CUSTOM\",\"friends\": \"SOME_FRIENDS\",\"networks\": \"\",\"allow\": \"" + AcquaintancesId + "\",\"deny\": \"\"}";
                    }
                    return JValue;
                }
                return "";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return "";
            }
        }


    }
}
